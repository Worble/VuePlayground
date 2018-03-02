<template>
<div>
  <div>
    <p>Amount per second: {{ Math.round(amountPerMs) }}
    <p>{{ Math.round(counter) }}</p>
    <button v-on:click="click">Click</button>
    <br/>
    <div v-for="building in buildings" :key="building.id">
      <button v-on:click="buyBuilding(building.id)">
        {{ building.name + ": Adds " + (building.clicksPerMs * timeUpdateModifier * modifierToOneSecond) + "/s, costs " + building.cost + " (" + building.amountOwned + " owned)" }}
      </button>
      <button v-if="!building.isTemp" v-on:click="sellBuilding(building.id)">
        Sell building for {{ calculateSaleCost(building) }} (80% value)
      </button>
      <button v-else disabled>
        Cannot sell temporary buildings
      </button>
    </div>
  </div>
  <div>
    <a href="/test/" v-on:click.prevent="$router.push({ name: 'Test'})">Back to test page</a>
    <br/>
    <a href="/" v-on:click.prevent="$router.push({ name: 'HelloWorld'})">Back to home</a>
    <br/>
  </div>
</div>
</template>
<script>
export default {
  name: 'cicker',
  data () {
    return {
      buildings: [
        {
          id: 1,
          name: 'Skeleton',
          initialCost: 10,
          cost: 10,
          clicksPerMs: 0.002,
          amountOwned: 0,
          modifier: 0.3,
          isTemp: true,
          tempTimeMs: 10000 // 10 seconds
        },
        {
          id: 2,
          name: 'Zombie',
          cost: 50,
          initialCost: 50,
          clicksPerMs: 0.01,
          amountOwned: 0,
          modifier: 0.3
        }
      ],
      tempBuildings: [],
      clickPower: 1,
      counter: 100,
      amountPerMs: 0,
      timeUpdateModifier: 100
    }
  },
  methods: {
    click: function () {
      this.counter += this.clickPower
    },

    buyBuilding: function (id) {
      var building = this.buildings.find(x => x.id === id)
      if (building && building.cost <= this.counter) {
        building.amountOwned += 1
        this.counter -= building.cost
        this.calculateBuildingCost(building)
        if (building.isTemp) {
          this.tempBuildings.push({
            buildingId: building.id,
            countdownMs: building.tempTimeMs
          })
        }
      }
    },

    sellBuilding: function (id) {
      var building = this.buildings.find(x => x.id === id)
      if (building.amountOwned > 0) {
        building.amountOwned -= 1
        this.calculateBuildingCost(building)
        this.counter += building.cost * 0.8
      }
    },

    calculateBuildingCost: function (building) {
      building.cost = Math.round(
        building.initialCost *
          Math.pow(1 + building.modifier, building.amountOwned)
      )
    },

    calculateSaleCost: function (building) {
      return Math.round(
        (building.initialCost *
          Math.pow(1 + building.modifier, (building.amountOwned - 1))
        ) * 0.8
      )
    },

    updateAmount: function () {
      // update counter
      var amount = 0
      for (var i = 0; i < this.buildings.length; i++) {
        amount +=
          this.buildings[i].clicksPerMs *
          this.buildings[i].amountOwned *
          this.timeUpdateModifier
      }
      this.counter += amount

      // update buildings
      for (i = 0; i < this.tempBuildings.length; i++) {
        if (this.tempBuildings[i].countdownMs <= 1) {
          var building = this.buildings.find(
            x => x.id === this.tempBuildings[i].buildingId
          )
          building.amountOwned -= 1
          this.calculateBuildingCost(building)
          this.tempBuildings.splice(i, 1)
          amount -=
            this.buildings[i].clicksPerMs *
            this.buildings[i].amountOwned *
            this.timeUpdateModifier
        } else {
          this.tempBuildings[i].countdownMs -= this.timeUpdateModifier
        }
      }
      this.amountPerMs = amount * this.modifierToOneSecond
    }
  },
  computed: {
    modifierToOneSecond: function () {
      return 1000 / this.timeUpdateModifier
    }
  },
  mounted: function () {
    this.updateAmount()
    var func = this.updateAmount
    var time = this.timeUpdateModifier
    setInterval(function () {
      func()
    }, time)
  }
}
</script>
