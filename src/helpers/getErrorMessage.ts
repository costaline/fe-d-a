interface DetailError {
	path: string[]
	message: string
	name: string
}

interface ApiErrorResponse {
	data: null
	error: {
		status: number
		name: string
		message: string
		details: {
			errors: DetailError[]
		}
	}
}

export const guardApiError = (error: any): error is ApiErrorResponse => {
	return 'error' in error
}

// TODO: update
export const getErrorMessage = (error: any): string => {
	if (guardApiError(error)) {
		return error.error.message
	}

	// eslint-disable-next-line @typescript-eslint/restrict-template-expressions
	return `${error?.status ?? 'Something went wrong'}`
}
