import { IHCAPIUser } from "@huskiesio/types/dts/objects"

export const getUserById = (id: string): IHCAPIUser => {
  return {
    firstName: 'Max',
    lastName: 'Isom',
    username: 'mtisom',
    publicKey: Buffer.from(''),
    updatedAt: new Date().getTime(),
    createdAt: new Date().getTime(),
    id: '1'
  }
}

export const getAvatarById = (id: string): Buffer => {
  return Buffer.from('');
}
