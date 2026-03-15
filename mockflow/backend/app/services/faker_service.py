from typing import Any

from faker import Faker

fake = Faker()

FAKER_MAP: dict[str, Any] = {
    "name": fake.name,
    "email": fake.email,
    "address": fake.address,
    "phone": fake.phone_number,
    "company": fake.company,
    "text": fake.text,
    "uuid": fake.uuid4,
    "date": fake.date,
    "url": fake.url,
    "integer": lambda: fake.random_int(1, 10000),
    "boolean": fake.pybool,
}


def generate_fake_data(template: dict) -> dict | list:
    """
    Template format:
    {
        "_count": 5,
        "name": "name",
        "email": "email",
        "age": "integer"
    }
    """
    template = dict(template)  # avoid mutating original
    count = template.pop("_count", None)

    def _generate_single(tmpl: dict) -> dict:
        result = {}
        for key, faker_key in tmpl.items():
            if faker_key in FAKER_MAP:
                result[key] = FAKER_MAP[faker_key]()
            else:
                result[key] = faker_key
        return result

    if count and isinstance(count, int):
        return [_generate_single(template) for _ in range(count)]

    return _generate_single(template)
