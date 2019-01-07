<template>
  <div>
    <div class="date-picker">{{this.month}}</div>
    <div class="day-pick">
      <div
        :class="['day-item',activeDay==index?'active':'']"
        v-for="(item,index) of days"
        :key="index"
        @click="changeDay(index,item.date)"
      >
        <div class="item-day">{{item.day}}</div>
        <div class="item-week">{{item.week}}</div>
      </div>
    </div>
    <div class="base-list">
      <a
        href="javascript:;"
        class="list-item"
      >
        <div class="item-left">请选择年龄：</div>
        <div class="item-mid">18岁</div>
        <div class="item-right"></div>
      </a>
    </div>
    <div
      class="course-month"
      v-for="(value,key) of list"
      :key="key"
    >
      <div class="time-line"><span class="date">{{key}}</span><i class="fill-line"></i></div>
      <div class="course-list">
        <lesson-card
          :type="index%3==0?'read':'write'"
          :lessonInfo="item"
          v-for="(item,index) of value"
          :key="key+index"
        />
        <!-- <lesson-card type='write' /> -->
      </div>
    </div>
  </div>
</template>
<script>
import LessonCard from "@/components/LessonCard";
export default {
  async created() {
    this.date = this.$moment().format("YYYY-MM-DD");
    this.getDayList();
    this.getList();
  },
  data() {
    return {
      list: {},
      age: 18,
      day: 11,
      days: [],
      activeDay: ""
    };
  },
  metaInfo: { title: "预定课程" },
  components: {
    LessonCard
  },
  methods: {
    async getList() {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        loadingType: "spinner",
        message: "加载中..."
      });
      let res = await this.$ajax.post("/lesson/list", { date: this.date });
      this.$toast.clear();
      if (res.cd != 0) {
        this.$toast(res.msg);
        return;
      }
      this.list = res.data;
    },
    getDayList() {
      //   console.log(
      //   this.$moment(this.date).daysInMonth(),
      //   this.$moment(this.date).format("dddd"),
      //   this.$moment(this.date).format("D")
      // );
      let list = [];
      let monthEndDay = this.$moment(this.date).daysInMonth();
      let day = Number(this.$moment(this.date).format("D"));
      this.activeDay = 0;
      for (let i = 0; i <= monthEndDay - day; i++) {
        let obj = {};
        obj.day = i + day;
        obj.week = this.$moment(this.date)
          .add(i, "day")
          .format("ddd");
        obj.date = this.$moment(this.date)
          .add(i, "day")
          .format("YYYY-MM-DD");
        list.push(obj);
      }
      console.log(list);
      this.days = list;
    },
    changeDay(i, date) {
      if (date === this.date) {
        return;
      }
      this.activeDay = i;
      this.date = date;
      this.getList();
    }
  },
  computed: {
    month() {
      return this.$moment(this.date).format("M月");
    }
  }
};
</script>
<style scoped lang='less'>
.base-list {
  margin-top: 0.3rem;
  margin-bottom: 0.3rem;
}
.date-picker {
  height: 0.68rem;
  line-height: 0.68rem;
  background-color: #353443;
  color: #fff;
  text-align: center;
  font-size: 0.34rem;
}
.day-pick {
  display: flex;
  width: 100%;
  align-items: center;
  height: 0.98rem;
  color: #2f2f2f;
  .day-item {
    width: 0.76rem;
    user-select: none;
    flex-shrink: 0;
    float: left;
    padding: 0.1rem;
    border-radius: 0.04rem;
    margin: 0 0.1rem;
    text-align: center;
    &.active {
      background-color: #fd4c4e;
      color: #fff;
    }
    .item-day {
      font-size: 0.3rem;
      font-weight: bold;
    }
    .item-week {
      font-size: 0.24rem;
    }
  }
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  background-color: #fff;
}
.course-month {
  padding: 0.3rem 0 0.01rem;
  background-color: #fff;
  .time-line {
    display: flex;
    align-items: center;
    padding-bottom: 0.5rem;
    .date {
      padding-right: 0.3rem;
      height: 0.5rem;
      line-height: 0.5rem;
      background-color: #ffeded;
      color: #fd4c4e;
      padding-left: 0.22rem;
      border-radius: 0 0.25rem 0.25rem 0;
    }
    .fill-line {
      height: 1px;
      background-color: #ddd;
      flex: 1;
    }
    font-size: 0.3rem;
  }
  .course-list {
    padding-left: 0.3rem;
  }
}
</style>