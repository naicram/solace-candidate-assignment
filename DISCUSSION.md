# Next Steps

## Backend
The plan was to leverage the local docker db instance in order to implement a proper filtered, paginated search.

### data model
1. update phone number field to be limited varchar instead of bigint

### filter + pagination logic

#### filter
A useful conversation would be to discuss what the "on page load" query should be. It would seem as if without city
(and really, specialty) defined, a list would be useless to a patient. UX that denotes this (empty list with language)
while pointing to necessary actions (CTO) seems like a good move. 

note: Knowing that many patients could be less technology
inclined, the wrong UI could make it feel like the search isn't working.

A simple way to incorporate the search values provided (city + specialites) is to leverage like for city. Specialties
would require additional logic since it is a jsonb field. This would be a good opportunity to revist the use of this
field type vs extracting it out into its own mapping + enum table (a good performance exercise).

#### pagination
A v0 implementation could have been to leverage offset + limit calculations in an updated sql query

### performance
Establishing a cache strategy makes sense here as well, I wouldn't expect the advocate data set to be updated that frequently (maybe a cache refresh a few times a day would suffice?)
A lot of options here to have targeted caches depending on usage.

### DAL
data access objects could further asbtract any api calls allowing for cache checks upon every call and a simpler DX

## Frontend

### data table formatting
improve the formatting of the data table to allow for better readability

### improve interaction responses
since I was using the "less than ideal" filtering logic while working on UX changes, I did not address certain interaction flows that were broken (e.g. resetting the results).
A simple button that refetched the full dataset seemed like low hanging fruit but would have rather solved it along with backend performance work.
