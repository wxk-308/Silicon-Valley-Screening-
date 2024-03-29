import { defineStore } from 'pinia'
import { ref } from 'vue'
import { reqC1, reqC2, reqC3 } from '@/api/product/attr'
import type { CategoryResponseData } from '@/api/product/attr/type'

export const useCategoryStore = defineStore('Category', () => {
  const c1Id = ref<string | number>('')
  const c1Arr = ref<any>([])
  const c2Id = ref<string | number>('')
  const c2Arr = ref<any>([])
  const c3Id = ref<string | number>('')
  const c3Arr = ref<any>([])

  //获取一级分类的方法
  const getC1 = async () => {
    //发请求获取一级分类的数据
    const result: CategoryResponseData = await reqC1()
    if (result.code == 200) {
      c1Arr.value = result.data
    }
    console.log(c1Arr.value)
  }
  //获取二级分类的数据
  const getC2 = async () => {
    //获取对应一级分类的下二级分类的数据
    const result: CategoryResponseData = await reqC2(c1Id.value)
    if (result.code == 200) {
      c2Arr.value = result.data
    }
  }

  //获取三级分类的数据
  const getC3 = async () => {
    const result: CategoryResponseData = await reqC3(c2Id.value)
    if (result.code == 200) {
      c3Arr.value = result.data
    }
  }
  return { c1Id, c1Arr, c2Id, c2Arr, c3Id, c3Arr, getC1, getC2, getC3 }
})
