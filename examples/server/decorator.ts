function log(target, property, descriptor) {
  const oldValue = descriptor.value
  console.log(target, property, descriptor)
  descriptor.value = function () {
    // eslint-disable-next-line prefer-rest-params
    console.log(`Calling ${property} with`, arguments)
    // eslint-disable-next-line prefer-rest-params
    return oldValue.apply(this, arguments)
  }

  return descriptor
}
class Test {
  @log
  add(a, b, c) {
    return a + b + c
  }
}

const math = new Test()

// passed parameters should get logged now
math.add(2, 4, 5)
