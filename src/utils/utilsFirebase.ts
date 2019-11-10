import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {dateToUTC} from './utilsGeneral';

export function createFirebaseTimestamp(date?: Date) {
  return firestore.Timestamp.fromDate(date ? dateToUTC(date) : dateToUTC());
}
