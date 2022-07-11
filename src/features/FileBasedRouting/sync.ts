import { ctx } from './ctx/sync'
import { factory } from './factories/sync'

const { FileBasedRouting, routes } = factory(ctx)

export { FileBasedRouting, routes }

export default FileBasedRouting
