# README

## Setup
```
rbenv local
bundle install
```

## Run

Will run the database and Rails
```
foreman start
```

## Frontend

There's a very simple Rails app that is auto-generated on each page hit. So not efficient, but gets the demo's job done.

## Tests

### Setup
```
rails db:create db:migrate RAILS_ENV=test
```

### Run
```
rspec
```

## Rails Extras
1. Rspec & FactoryBot with Faker
2. Serializers and Services 
3. Postgres & `annotate` for automatically annotating models