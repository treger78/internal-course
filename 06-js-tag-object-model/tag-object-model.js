function tagObjectModel(htmlLine) {
  if (!htmlLine) return {};

  const getTagName = (htmlLine) => {
    const tagName = htmlLine.match(/^<\w+/i);

    return tagName ? tagName[0].replace(/</g, '') : null;
  }

  const getTagContent = (htmlLine) => {
    const tagContent = htmlLine.match(/>[\w\s]+</i);

    return tagContent ? tagContent[0].replace(/[<>]/g, '') : null;
  }

  const getTagAttributes = (htmlLine) => {
    let unsortedAttributes = htmlLine.match(/<\w+\s([^>])*/gi);

    if (!unsortedAttributes) return {};

    unsortedAttributes = unsortedAttributes[0].replace(/^<\w+\s/, '').replace('/', '');;

    const attributesWithValues = unsortedAttributes.match(/\w+="\w+"/gi);
    const attributesWithoutValues = unsortedAttributes.match(/\w+(?![="])\b/gi);

    const attributes = {};

    if (attributesWithValues) {
      const splitedAttributesWithValues = attributesWithValues.toString().match(/\w+/gi);

      for (let i = 0; i < splitedAttributesWithValues.length; i += 2) {
        attributes[splitedAttributesWithValues[i]] = splitedAttributesWithValues[i + 1];
      }
    }

    if (attributesWithoutValues) {
      attributesWithoutValues.forEach((attribute) => attributes[attribute] = true);
    }

    return attributes;
  }

  return {
    tagName: getTagName(htmlLine),
    tagContent: getTagContent(htmlLine),
    tagAttributes: getTagAttributes(htmlLine),
  };
}

module.exports = tagObjectModel;
