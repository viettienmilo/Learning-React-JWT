import {
    useQuery,
    useMutation,
} from '@tanstack/react-query'
import { AxiosInstance } from './AxiosInstance';

// create a custom hook call useRegister to do the registering new user
export const useRegister = () => {
    // use Mutation to register new user
    // update a mutateAsync (UseMutationResult)
    return useMutation({
        mutationFn: async (data) => {
            const response = await AxiosInstance.post('users/register', data);
            return response.data;
        },
    })
}

// create a custom hook call useLogin to do the logging in for existing user
export const useLogin = () => {
    // use Mutation to log in existing user
    // update a mutateAsync (UseMutationResult)
    return useMutation({
        mutationFn: async (data) => {
            const response = await AxiosInstance.post('users/login', data);
            return response.data;
        },
    })
}
