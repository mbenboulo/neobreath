import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

/**
 * This app lives inside a sibling Remotion project's directory, so two
 * package-lock.json files exist and Next otherwise infers the PARENT directory
 * as the workspace root. Pin it here so builds do not depend on inference.
 */
const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  turbopack: {
    root: projectRoot,
  },
};

export default nextConfig;
