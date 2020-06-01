export const getFileAnchor = (file, contentType, name) => {
  const blob = new Blob([file], { type: contentType });
  const anchor = document.createElement('a');
  anchor.setAttribute('href', window.URL.createObjectURL(blob, { type: 'text/plain' }));
  anchor.setAttribute('download', name);
  document.body.appendChild(anchor);
  return anchor;
};

export default getFileAnchor;
