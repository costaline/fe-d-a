import { ctx } from './ctx/syncConfigurable'
import { factory } from './factories/sync'

const { FileBasedRouting, routes } = factory(ctx)

export { FileBasedRouting, routes }

export default FileBasedRouting
