# OSPF 邻居排查笔记

## 快速判断

先执行 `display ospf peer`，确认邻居状态是否进入 Full。

## 重点字段

- Neighbor ID：邻居 Router ID
- State：邻居状态
- Address：邻居接口地址
- Interface：本端出接口
- Dead Time：邻居失效倒计时

## 排查顺序

1. 物理与三层互通
2. Area ID 是否一致
3. Hello / Dead 间隔是否一致
4. 网络类型是否一致
5. 认证、MTU、Router ID 是否冲突

## 常见结论

如果一直停留在 ExStart/Exchange，优先检查 MTU 和网络类型。
