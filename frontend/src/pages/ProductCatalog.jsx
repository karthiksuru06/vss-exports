/**
 * ProductCatalog Page - Premium 180° Rotating Arc Explorer
 *
 * This page features an interactive product explorer with:
 * - 180° semi-circular rotating arc of product thumbnails
 * - Physics-based rotation with inertia and snap-to-center
 * - Video panel showing active product media
 * - Glass-style flip card for product details
 *
 * Desktop only - optimized for mouse wheel and drag interactions.
 */

import { ProductsPageLayout } from '../components/explorer';

/**
 * ProductCatalog Component
 *
 * Renders the premium arc-based product explorer.
 * All state management is handled within ProductsPageLayout.
 */
const ProductCatalog = () => {
  return <ProductsPageLayout />;
};

export default ProductCatalog;
