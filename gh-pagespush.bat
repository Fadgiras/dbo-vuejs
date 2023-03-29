yarn build
git add -f dist && git commit -m "Update gh-pages"
git subtree push --prefix dist origin gh-pages
git reset --hard HEAD^1