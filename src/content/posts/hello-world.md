---
title: Hello, World
description: >
    The path of the righteous man is beset on all sides by the iniquities of the selfish and the tyranny of evil men.
    Blessed is he who, in the name of charity and good will, shepherds the weak through the valley of darkness, for he is truly his brother's keeper and the finder of lost children.
    And I will strike down upon thee with great vengeance and furious anger those who would attempt to poison and destroy My brothers.
    And you will know My name is the Lord when I lay My vengeance upon thee.
publishedAt: 2023-09-19T21:12:25+01:00
tags:
  - test
---

# Hello, World!

This is a simple test of content collections

```typescript
enum FIELD {
  FOO = 'foo'
}

type FieldTypeMapping = {
  [T in FIELD]: {
    [FIELD.FOO]: string | null
  }[T]
}

type FieldConfigMap = {
  [T in FIELD]: {
    key: string
    unmarshal: (raw?: string) => FieldTypeMapping[T]
  }
}

const TypeConfigMapping: FieldConfigMap = {
  [FIELD.FOO]: {
    key: 'f',
    unmarshal: (raw) => JSON.parse(raw || 'null'),
  },
}

export function fetchField<T extends FIELD>(
  id: string,
  fields: T[]
): Pick<FieldTypeMapping, T>;
```

And more!

> My money's in that office, right? If she start giving me some bullshit about it ain't there,
> and we got to go someplace else and get it, I'm gonna shoot you in the head then and there.
> Then I'm gonna shoot that bitch in the kneecaps, find out where my goddamn money is.
> She gonna tell me too. Hey, look at me when I'm talking to you, motherfucker.
> You listen: we go in there, and that nigga Winston or anybody else is in there,
> you the first motherfucker to get shot. You understand?

Amazing Lists!

1. One
2. **Two**
    1. Nested!
3. Three

- _Uno_
  - Nested!
- Dos
- Tres

And some [links](https://blog.nonsensebb.com) as well.
