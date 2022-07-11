import { ctx } from './ctx/lazy'
import { factory } from './factories/lazy'

const { FileBasedRouting, routes } = factory(ctx)

export { FileBasedRouting, routes }

export default FileBasedRouting
