/** @type {import('next').NextConfig} */
import path from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { fileURLToPath } from 'url';

const nextConfig = {
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
};

export default nextConfig;
