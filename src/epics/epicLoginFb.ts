import { mapTo, switchMap } from 'rxjs/operators'; 
import { ofType } from 'redux-observable'; 
import { action$ } from '../@types/global';
import { showModal } from '../utils/rrn';

export default (action$: action$) => action$.pipe(
    ofType('LOGIN_FB'),
    mapTo({ type: 'LOGIN_FB_FINISH'})
)