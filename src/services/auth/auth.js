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
            return await AxiosInstance.post('users/register', data).data;
        },
    })
}

// create a custom hook call useLogin to do the logging for existing user
export const useLogin = () => {
    // use Mutation to login existing user
    // update a mutateAsync (UseMutationResult)
    return useMutation({
        mutationFn: async (data) => {
            return await AxiosInstance.post('users/login', data).data;
        },
    })
}

