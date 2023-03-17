import * as React from 'react';
import { IAuthContext } from "../interfaces/ContextInterface"
import EncryptedStorage from "react-native-encrypted-storage";

type AuthContextProviderProps = {
	children: React.ReactNode
};

export const AuthContext = React.createContext<{
	state: IAuthContext, authContext: {
		signIn: (token: string) => Promise<void>;
		signOut: () => Promise<void>;
		signUp: (token: string) => Promise<void>;
		restore: (token: string) => void;
	}
}>({
	state: {
		isLoading: true,
		isSignout: false,
		userToken: null
	},
	authContext: {
		signIn: (token: string) => new Promise(() => { }),
		signOut: () => new Promise(() => { }),
		signUp: (token: string) => new Promise(() => { }),
		restore: (token: string) => { }
	}
});

type ACTIONTYPE =
	| {
		token: string; type: "RESTORE_TOKEN";
	}
	| {
		token: string; type: "SIGN_IN";
	}
	| { type: "SIGN_OUT"; };


export const AuthProvider = ({ children }: AuthContextProviderProps) => {

	const reducer = (state: IAuthContext, action: ACTIONTYPE) => {
		switch (action.type) {
			case 'RESTORE_TOKEN':
				return {
					...state,
					userToken: action.token,
					isLoading: false,
				};
			case 'SIGN_IN':
				return {
					...state,
					isSignout: false,
					userToken: action.token,
				};
			case 'SIGN_OUT':
				return {
					isLoading: false,
					isSignout: true,
					userToken: null,
				};
		}
	}

	const [state, dispatch] = React.useReducer(reducer, {
		isLoading: true,
		isSignout: false,
		userToken: null,
	});

	const authContext = React.useMemo(
		() => ({
			signIn: async (token: string) => {
				// console.log('sign_in')
				try {
					await EncryptedStorage.setItem("token", token);
				} catch (error) {
					console.log(error)
				}
				dispatch({ type: 'SIGN_IN', token: token });
			},
			signOut: async () => {
				// console.log('sign_out')
				try {
					await EncryptedStorage.removeItem("token");;
				} catch (error) {
					console.log(error)
				}
				dispatch({ type: 'SIGN_OUT' })
			},
			signUp: async (token: string) => {
				// console.log('sign_up')
				try {
					await EncryptedStorage.setItem("token", token);
				} catch (error) {
					console.log(error)
				}
				dispatch({ type: 'SIGN_IN', token: token });
			},
			restore: (token: string) => {
				// console.log('restore')
				dispatch({ type: 'RESTORE_TOKEN', token: token });
			}
		}),
		[]
	);

	return (
		<AuthContext.Provider value={{ state, authContext }}>
			{children}
		</AuthContext.Provider>
	)
}