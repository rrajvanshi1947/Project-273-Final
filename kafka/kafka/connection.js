var kafka = require("kafka-node");
var ConsumerGroup = require("kafka-node").ConsumerGroup;

function ConnectionProvider() {
  this.getConsumer = function(topic_name) {
    //this.client = new kafka.Client("ec2-13-52-34-13.us-west-1.compute.amazonaws.com:2181");
    this.client = new kafka.Client("localhost:2181");
    this.kafkaConsumerConnection = new kafka.Consumer(this.client, [
      { topic: topic_name, partition: 0 }
    ],
    {
      groupId: 'my-group'
    });
    //testing
    /*var options = {
      host: "ec2-13-52-34-13.us-west-1.compute.amazonaws.com:2181",  // zookeeper host omit if connecting directly to broker (see kafkaHost below)
      kafkaHost: "ec2-13-52-34-13.us-west-1.compute.amazonaws.com:9092", // connect directly to kafka broker (instantiates a KafkaClient)
      zk : undefined,   // put client zk settings if you need them (see Client)
      batch: undefined, // put client batch settings if you need them (see Client)
      ssl: true, // optional (defaults to false) or tls options hash
      groupId: "ExampleTestGroup",
      sessionTimeout: 15000,
      // An array of partition assignment protocols ordered by preference.
      // 'roundrobin' or 'range' string for built ins (see below to pass in custom assignment protocol)
      protocol: ["roundrobin"],
     
      // Offsets to use for new groups other options could be 'earliest' or 'none' (none will emit an error if no offsets were saved)
      // equivalent to Java client's auto.offset.reset
      fromOffset: "latest", // default
      commitOffsetsOnFirstJoin: true, // on the very first time this consumer group subscribes to a topic, record the offset returned in fromOffset (latest/earliest)
      // how to recover from OutOfRangeOffset error (where save offset is past server retention) accepts same value as fromOffset
      outOfRangeOffset: "earliest", // default
      migrateHLC: false,    // for details please see Migration section below
      migrateRolling: true,
      // Callback to allow consumers with autoCommit false a chance to commit before a rebalance finishes
      // isAlreadyMember will be false on the first connection, and true on rebalances triggered after that
      onRebalance: (isAlreadyMember, callback) => { callback(); } // or null
    };
    this.kafkaConsumerConnection = new ConsumerGroup(options, topic_name);*/
    this.kafkaConsumerConnection.on("ready", function() {
      console.log("client ready!");
    });

    this.client.on("ready", function() {
      console.log("client ready!");
    });

    return this.kafkaConsumerConnection;
  };

  //Code will be executed when we start Producer
  this.getProducer = function() {
    if (!this.kafkaProducerConnection) {
      //this.client = new kafka.Client("ec2-13-52-34-13.us-west-1.compute.amazonaws.com:2181");
      this.client = new kafka.Client("localhost:2181");
      var HighLevelProducer = kafka.HighLevelProducer;
      this.kafkaProducerConnection = new HighLevelProducer(this.client);
      //this.kafkaConnection = new kafka.Producer(this.client);
      console.log("producer ready");
    }
    return this.kafkaProducerConnection;
  };
}
exports = module.exports = new ConnectionProvider();
