<template>
  <div class="release-content">
    <div class="title">
      <div class="left">发版内容</div>
      <a-popover v-model:open="popoverVisible" trigger="click" placement="bottom">
        <template #content>
          <div v-if="!showImgUpdate" class="add-button popover-button">
            <div class="item">
              <div class="icon img-icon"></div>
              <span> 新增镜像更新</span>
            </div>
            <div v-if="!showSqlUpdate" class="item center-item">
              <div class="icon file-icon"></div>
              <span> 新增配置文件更新</span>
            </div>
            <div v-if="!showFileUpdate" class="item">
              <div class="icon sql-icon"></div>
              <span> 新增SQL更新</span>
            </div>
          </div>
        </template>
        <a-button type="primary" v-if="!empty" @click="togglePopover()">+ 新增发版内容</a-button>
      </a-popover>
    </div>
    <div class="empty-info" v-if="empty">
      <div class="empty-icon"></div>
      <span class="empty-icon-tip">你还没有发版内容，请点击你需要的发版模块新增</span>
      <div class="add-button">
        <div class="item">
          <div class="icon img-icon"></div>
          <span> 新增镜像更新</span>
        </div>
        <div class="item center-item">
          <div class="icon file-icon"></div>
          <span> 新增配置文件更新</span>
        </div>
        <div class="item">
          <div class="icon sql-icon"></div>
          <span> 新增SQL更新</span>
        </div>
      </div>
    </div>
    <div class="release-content-list" v-if="!empty">
      <ImgUpdate v-if="showImgUpdate" @delete="hideComponent('ImgUpdate')" />
      <SqlUpdate v-if="showSqlUpdate" @delete="hideComponent('SqlUpdate')" />
      <FileUpdate v-if="showFileUpdate" @delete="hideComponent('FileUpdate')" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ImgUpdate from './ImgUpdate.vue';
import SqlUpdate from './SqlUpdate.vue';
import FileUpdate from './FileUpdate.vue';
const showImgUpdate = ref(true);
const showSqlUpdate = ref(true);
const showFileUpdate = ref(true);
const hideComponent = (component: string) => {
  switch (component) {
    case 'ImgUpdate':
      showImgUpdate.value = false;
      break;
    case 'SqlUpdate':
      showSqlUpdate.value = false;
      break;
    case 'FileUpdate':
      showFileUpdate.value = false;
      break;
  }
};
const empty = ref(false);
const popoverVisible = ref(false);
const togglePopover = () => {
  popoverVisible.value = empty.value;
}
</script>

<style scoped>
.release-content {
  background: #FFFFFF;
  border-radius: 3px;
  padding: 20px;
  box-sizing: border-box;
  flex: 1;
  font-family: PingFangSC-Regular;


  .title {
    font-family: PingFangSC-Medium;
    font-weight: 500;
    font-size: 16px;
    color: #1A2446;
    letter-spacing: 0;
    line-height: 24px;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;

    .ant-btn {
      height: 28px;
      background: #ADC8FF;
      border-radius: 3px;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .active-btn {
      background: #3366FF;
    }
  }

  .empty-info {
    display: flex;
    flex-direction: column;
    align-items: center;

    .empty-icon {
      width: 161px;
      height: 120px;
      background-image: url('../assets/empty.png');
      background-repeat: no-repeat;
      background-position: center;
    }

    .empty-icon-tip {
      font-family: PingFangSC-Regular;
      font-weight: 400;
      font-size: 14px;
      color: #3C4968;
      letter-spacing: 0;
      text-align: center;
    }

    .add-button {
      margin-top: 35px;
      width: 440px;
      height: 140px;
      border: 1px dashed #CFDAE8;
      border-radius: 9px;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      ;

      .center-item {
        margin-right: 16px;
        margin-left: 16px;
      }

      .item {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        .icon {
          width: 48px;
          height: 48px;
          background: #EFF4FF;
          border-radius: 50%;
          margin-bottom: 8px;
        }

        .icon:hover {
          background-color: #3366FF;
        }

        .img-icon {
          background-image: url('../assets/img.png');
          background-repeat: no-repeat;
          background-position: center;
        }

        .file-icon {
          background-image: url('../assets/file.png');
          background-repeat: no-repeat;
          background-position: center;
        }

        .sql-icon {
          background-image: url('../assets/sql.png');
          background-repeat: no-repeat;
          background-position: center;
        }

        span {
          color: #1A2446;
        }
      }

    }
  }
}




.add-button {
  margin-top: 35px;
  width: 440px;
  height: 140px;
  border: 1px dashed #CFDAE8;
  border-radius: 9px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  ;

  .center-item {
    margin-right: 16px;
    margin-left: 16px;
  }

  .item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .icon {
      width: 48px;
      height: 48px;
      background: #EFF4FF;
      border-radius: 50%;
      margin-bottom: 8px;
    }

    .icon:hover {
      background-color: #3366FF;
    }

    .img-icon {
      background-image: url('../assets/img.png');
      background-repeat: no-repeat;
      background-position: center;
    }

    .file-icon {
      background-image: url('../assets/file.png');
      background-repeat: no-repeat;
      background-position: center;
    }

    .sql-icon {
      background-image: url('../assets/sql.png');
      background-repeat: no-repeat;
      background-position: center;
    }

    span {
      color: #1A2446;
    }
  }

}

.popover-button {
  margin-top: 0px;
  width: 320px;
  height: auto;
  border: none;
}

.ant-popover-arrow {
  display: none;
}
</style>