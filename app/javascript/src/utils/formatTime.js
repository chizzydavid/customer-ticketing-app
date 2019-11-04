export default (time) => {
  return time.split('T')[0].split('-').reverse().join('/');
}