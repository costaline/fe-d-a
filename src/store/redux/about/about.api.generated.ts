/* eslint-disable */ /**
 *
 * THIS FILE IS AUTOGENERATED, DO NOT EDIT IT!
 *
 * instead, edit one of the `.graphql` files in this project and run
 *
 * npm run graphql:codegen
 *
 * for this file to be re-created
 */

import * as Types from '../../../init/graphql/types.generated.js';

module.hot?.accept();
export type GetAboutQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetAboutQuery = { about?: { data?: { attributes?: { title?: string | null, content?: string | null, advanced?: string | null } | null } | null } | null };
