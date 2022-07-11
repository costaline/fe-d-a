import { ctx } from './ctx/lazyConfigurable'
import { factory } from './factories/lazy'

const { FileBasedRouting, routes } = factory(
	ctx,
	process.env.REACT_APP_PAGES_DIR
)

export { FileBasedRouting, routes }

export default FileBasedRouting
