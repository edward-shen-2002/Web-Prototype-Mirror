# TODOS

## Prioritized

- [ ] Excel view
- [ ] Package creation
- [ ] Some fetch/update components may use the MongoDB item to update -- if that's the case, update the ID in the frontend
- [ ] Modifying one hierarchy may affect other hierarchies -- update affected hierarchies (ie remove user from organization => remove organization in user)

## Unprioritized

- [ ] Token blacklist
- [ ] Webpack hostname - route production build with public URL (CRA can do it)
- [ ] Pagination
- [ ] Miscellaneous information - ie: job positions
- [ ] General and route error handlers- should everything be handled here or do it in the original route? (General error handler handles most errors but may not make sense for some routes)
- [ ] Strengthen verfication ids (change MongoDB Id to a more secure Id -- MongoDB Id is too predicatable)
- [ ] Keep styles considtent (ie, Profile and All packages headers/pages - mismatched styles)

## Important but Unprioritized (may be too time-consuming at the moment - work on it gradually)

- [ ] Scope Checking
