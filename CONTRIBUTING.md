
# Contributing to Kaizen Web Client

Here are a few guidelines that will help you along the way.

## Issues

### Before creating issues please

- Read the documentation.
- Search for duplicates.
- Make sure you're following the templates, if you don't see a template for your type of issue feel free to create a feature issue for it.

### At the moment you're creating an issue please

- Make sure you're following the issues naming standard

### Issues naming standard

[Organization acronym][Project first letter][Team first letter] [Issue name]

#### Example

```bash
SSKB Contribution Guideline
```

- SS = Organization acronym / Sphinx Society
- K = Project first letter / Kaizen
- B = Team first letter / Backend
- Contribution Guideline = Issue name

## Branches

### Branches naming standard

[Organization acronym][Project first letter][Team first letter]-[Issue ID]

### Example

```bash
git checkout -b SSKB-1
git checkout -b SSKW-1
```

- SS = Organization acronym / Sphinx Society
- K = Project first letter / Kaizen
- B = Team firts letter / Backend
- 1 = Issue ID

## Commits

### Commits naming standard

[Branch Name] + [Verb] + [Substantive] + [What for]

### Example

```bash
git commit -m 'SSKB-1 Added logger class to use a logger service'
git commit -m 'SSKB-1 Added logger class to use a logger service'
```

- Branch Name - SSKB-1
- Verb - Added
- Substantive - logger class
- What for - to use a logger service

## Pull Requests

### Before creating a pull request please

- Make sure you created an [Issue](https://www.github.com/sphinx-society/kaizen-web-client/issues) related to it and you're following the [issues section](#Issues) recommendations 
- Make sure you're following the [branches section](#Branches) recommendations
- Make sure you're following the [commits section](#Commits) recommendations

## License

By contributing your code to the sphinx-society/kaizen-web-client GitHub repository, you agree to license your contribution under the [MIT license](/LICENSE).

