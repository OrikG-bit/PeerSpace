# PeerSpace for Netlify

An independent student project with selected GEN 103 resources. Not an official NLU website.

## Quick publish
1. Sign in at https://app.netlify.com/drop
2. Unzip peerspace-netlify-upload.zip.
3. Drag the extracted folder containing index.html into Netlify Drop.
4. Netlify will provide a public HTTPS address. Rename the site in its project settings if desired.

## Future edits / GitHub deployment
Install Node 22.13+ and run `npm install`, then `npm run build`.
Upload the contents of dist, or connect this source folder in a GitHub repository to Netlify.
Build command: npm run build. Publish directory: dist. netlify.toml configures these automatically.

## What is included
The student-facing interface, 35 resource cards, illustrations, filters, dialogs, history navigation, and browser-local saved resources.
The resource catalog is bundled with the app; publish a new build to update it.
No backend editor or Cloudflare database is included in this static export.
Saved resources belong to the browser and origin, so saves from the previous address do not migrate automatically.
Original project files and hosting are unchanged.
