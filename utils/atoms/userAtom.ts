import { atomWithStorage, createJSONStorage } from 'jotai/utils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '@/types/User'

const storage = createJSONStorage<{ _id: string; email: string; firstName: string; lastName: string } | null>(() => AsyncStorage)

export const userAtom = atomWithStorage<User | null>("user", null, storage, {
    getOnInit: true
})