"use strict";
const validator = {
  "brand": {
    "rules": [
      {
        "format": "int"
      },
      {
        "range": [
          {
            "text": "苹果",
            "value": 0
          },
          {
            "text": "华为",
            "value": 1
          },
          {
            "text": "荣耀",
            "value": 2
          },
          {
            "text": "小米",
            "value": 3
          },
          {
            "text": "红米",
            "value": 4
          },
          {
            "text": "OPPO",
            "value": 5
          },
          {
            "text": "VIVO",
            "value": 6
          },
          {
            "text": "iQOO",
            "value": 7
          },
          {
            "text": "Realme",
            "value": 8
          },
          {
            "text": "其他",
            "value": 9
          }
        ]
      }
    ],
    "title": "品牌",
    "defaultValue": 0,
    "label": "品牌"
  },
  "color": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "颜色",
    "label": "颜色"
  },
  "ram": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "内存",
    "label": "内存"
  },
  "price": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "价格",
    "label": "价格"
  },
  "device_uuid": {
    "rules": [
      {
        "format": "string"
      }
    ],
    "title": "型号",
    "label": "型号"
  }
};
const enumConverter = {
  "brand_valuetotext": {
    "0": "苹果",
    "1": "华为",
    "2": "荣耀",
    "3": "小米",
    "4": "红米",
    "5": "OPPO",
    "6": "VIVO",
    "7": "iQOO",
    "8": "Realme",
    "9": "其他"
  }
};
exports.enumConverter = enumConverter;
exports.validator = validator;
