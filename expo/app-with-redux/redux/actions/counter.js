module.exports = {
  increment: function() {
    console.log("increment action is being dispatched");
    return {
      type: "INCREMENT"
    };
  },
  decrement: function() {
    return {
      type: "DECREMENT"
    };
  }
};
