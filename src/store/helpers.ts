import { RootState } from '@@/store/index'

export type AppSelector<Return> = (state: RootState) => Return

export const createAppSelector = <R>(
	selector: AppSelector<R>
): AppSelector<R> => selector
