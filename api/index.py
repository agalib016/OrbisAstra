import os
import sys

# Ensure the root directory is accessible in sys.path
root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
if root_dir not in sys.path:
    sys.path.insert(0, root_dir)

from app import app

# Vercel serverless function entrypoint
# Exposes `app` for Vercel's Python WSGI runtime
if __name__ == '__main__':
    app.run(debug=True)
