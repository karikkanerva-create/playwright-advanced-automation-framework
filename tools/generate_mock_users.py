import json

users = []

for i in range(1, 6):

    users.append({
        "id": i,
        "email": f"user{i}@example.com",
        "first_name": f"User{i}",
        "last_name": "Tester"
    })

with open(
    "data/mocks/generated-users.json",
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        {
            "page": 1,
            "data": users
        },
        file,
        indent=2
    )

print("Generated mock users.")

