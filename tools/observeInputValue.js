export function observeInputValue(element, callback) {
    const elementPrototype = Object.getPrototypeOf(element);
    const descriptor = Object.getOwnPropertyDescriptor(elementPrototype, "value");
    Object.defineProperty(element, "value", {
        get: function (...args) {
            // @ts-expect-error
            return descriptor.get.apply(this, args);
        },
        set: function (...args) {
            // @ts-expect-error
            descriptor.set.apply(this, args);
            const newValue = this.value;
            callback(newValue);
            return newValue;
        }
    });
}
//# sourceMappingURL=observeInputValue.js.map