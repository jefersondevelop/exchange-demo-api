import moongose from 'mongoose';

export function isValidUUID(id: string) {

    if (!id) {
        return false;
    }

    return moongose.Types.ObjectId.isValid(id);
}