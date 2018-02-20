export function tracked(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  return {
    set: function(newValue: any) {
      this.setState({ [name]: newValue });
    },
    get: function() {
      return this.state[name];
    }
  }
}
