import { map } from 'rxjs/operators';
import { actionGeneral } from '../@types/redux';
import { state$, action$ } from '../@types/global';

export const isLoggedPipe = (state$: state$) => map((a: actionGeneral) =>
    ({ 
        ...a,
        isLogged: !!state$.value.app.currentUserFirebase && !!state$.value.app.currentUser,
        currentUser: state$.value.app.currentUser
    })
);