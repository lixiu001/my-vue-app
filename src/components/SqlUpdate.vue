<template>
  <div class="file-update">
    <div class="header">
      <CaretRightOutlined :class="{ 'active-class': isActive }" @click="changeStatus" />
      <span>SQL更新</span>
      <svg-icon v-if="isEdit" iconName="iconlajitong" className="iconlajitong" color="#8794AB" @click="deleteComponent"></svg-icon>
      <div v-if="isEdit" class="add" @click="addNewList">+</div>
    </div>
  </div>
  <div class="content" v-if="isActive">
    <div class="list-container">
      <div class="list" v-for="(item, index) in listItems" :key="index" @mouseover="handelMouseover(index)"
        @mouseleave="handelMouseleave()">
        <div class="seq">
          <span v-if="hoverIndex !== index || !isEdit"> {{ index + 1 }}</span>
          <svg-icon v-if="isEdit && hoverIndex === index" iconName="iconlajitong" color="#fff"
            @click="deleteItem(index)"></svg-icon>
        </div>
        <a-tooltip v-if="item.publishError || item.publishSucess">
          <template #title>{{ item.publishError ? '发布失败' : item.publishSucess ? '发布成功' : '' }}</template>
          <div class="tip" :class="{ 'error': item.publishError, 'sucess': item.publishSucess }"></div>
        </a-tooltip>
        <a-form ref="formRef" :model="item" layout="inline" class="release-info-form">
          <a-form-item label="服务名称：" :rules="[{ required: isEdit, message: '' }]">
            <a-select v-if="isEdit" v-model:value="item.no1" style="width: 200px">
              <a-select-option :value="option.id" v-for="( option, index) in options" :key="index">{{ option.id }}</a-select-option>
            </a-select>
            <span v-else>{{ item.no1 }}</span>
          </a-form-item>
          <a-form-item label="SQL脚本名称：" name="no2" :rules="[{ required: isEdit, message: '' }]">
            <a-input v-if="isEdit" v-model:value="item.no2" placeholder="请输入" clearable style="width: 200px" />
            <span v-else>{{ item.no2 }}</span>
          </a-form-item>
          <a-form-item class="archery" label="是否已经上传archery并审核通过" name="no3" :rules="[{ required: isEdit, message: '' }]">
            <a-radio-group v-if="isEdit" v-model:value="item.no3" name="radioGroup">
              <a-radio value="1">是</a-radio>
              <a-radio value="2">否</a-radio>
            </a-radio-group>
            <span v-else>{{ item.no3 }}</span>
          </a-form-item>
          <a-form-item label="发版原因：" :rules="[{ required: isEdit, message: '' }]">
            <a-select v-if="isEdit" v-model:value="item.no4" style="width: 200px">
              <a-select-option :value="reason.id" v-for="( reason, index) in reasons" :key="index" :label="reason.label">{{ reason.label
                }}</a-select-option>
            </a-select>
            <span v-else>{{ item.no4 }}</span>
          </a-form-item>
          <a-form-item label="验证结果">
            <span class="result" :class="{'result-error':false,'result-sucess':true}">{{ item.no5 }}</span>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { defineEmits } from 'vue';
import { CaretRightOutlined } from "@ant-design/icons-vue";
import { ListItem } from "../interface";

const props = defineProps({
  isEdit: {
    type: Boolean,
    default: true,
  },
  listItems: {
    type: Array as () => ListItem[],
    default: () => ([
      {
        publishError: false,
        publishSucess: false,
        no1: 'CRR',
        no2: '',
        no3: '2',
        no4: '1',
        no5: '成功',
      }
    ]),
  },
});
const emit = defineEmits(['delete']);
const formRef = ref();

const deleteComponent = () => {
  emit('delete');
};
const deleteItem = (index: number) => {
  listItems.value.splice(index, 1);
  if (!listItems.value.length) {
    emit('delete');
  }
};
const isActive = ref(true);
const listItems = ref([...props.listItems]);
const addNewList = () => {
  listItems.value.push({
    publishError: false,
    publishSucess: false,
    no1: '',
    no2: '',
    no3: '2',
    no4: '1',
    no5: '成功',
  });
};
const options = ref([
  { label: '到款认领', id: 'CRR' },
  { label: '智体平台', id: 'AGT' }
])

const reasons = ref([
  { label: '版本更新', id: '版本更新' },
  { label: '修复bug', id: '修复bug' }
])

const changeStatus = () => {
  isActive.value = !isActive.value;
};

const hoverIndex = ref(-1);
const handelMouseover = (index: number) => {
  console.log(index);
  hoverIndex.value = index;
};
const handelMouseleave = () => {
  hoverIndex.value = -1;
};

// const handleSubmit = () => {
//   const forms = formRef.value;
//   Promise.all(
//     forms.map((form) =>
//       form.validate().catch(() => {
//         return false;
//       })
//     )
//   ).then((results) => {
//     if (results.every((res) => res)) {
//       // 所有表单验证通过
//       console.log("All forms are valid:", listItems.value);
//     } else {
//       // 某些表单验证未通过
//       console.log("Some forms are invalid.");
//     }
//   });
// };

</script>

<style scoped>
.header {
  margin-bottom: 8px;
  position: relative;
  height: 20px;
  display: flex;
  align-items: center;


  span {
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #1A2446;
    margin-left: 4px;
  }

  .add {
    width: 20px;
    height: 20px;
    background: #3366FF;
    border-radius: 3px;
    position: absolute;
    right: 0px;
    top: 0px;
    text-align: center;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
  }

  .active-class {
    transform: rotate(90deg);
  }
}

.iconlajitong:hover {
  color: red;
}

.content {
  .list {
    background: #F8F9FB;
    border-radius: 2px;
    padding: 16px 16px 16px 48px;
    position: relative;

    .seq {
      position: absolute;
      top: 0px;
      left: 0px;
      width: 24px;
      height: 24px;
      background: #ADC8FF;
      border-radius: 2px 0 12px 0;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        color: #fff;
        font-weight: 500px;
        font-size: 12px
      }
    }

    .seq:hover {
      background: red;
    }
  }


  .result {
      border-radius: 3px;
      font-size: 12px;
      padding: 4px;

    }

    .result-error {
      background: #f5dfdf;
      color: red;
    }

    .result-sucess {
      background: #d2f5d5;
      color: #4FC42A;
    }





  .list:not(:last-child) {
    border-bottom: 1px dashed #bebaba;
  }

  .list:last-child {
    margin-bottom: 16px;
  }
}


:deep(.ant-form-item) {
  margin-bottom: 8px;
  margin-right: 16px;
  width: 350px;
}

:deep(.ant-form-item .ant-form-item-label >label) {
  color: #3C4968;
  width: 130px;
  margin-right: 8px;
  overflow: hidden;
  font-family: PingFangSC-Regular;
  font-weight: 400;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  justify-content: end;
}

:deep(.archery .ant-form-item-label >label) {
  width: auto;
}


:deep(span) {
  color: #1A2446;
}
</style>
