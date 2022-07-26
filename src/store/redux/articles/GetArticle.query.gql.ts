import { gql } from 'graphql-request'

export const GET_ARTICLES_QUERY = gql`
	query GetArticles {
		articles {
			data {
				attributes {
					title
				}
			}
		}
	}
`
