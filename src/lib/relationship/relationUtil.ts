import relationship from 'relationship.js';

export function relation(option?: {
	text?: string; // 目标对象：目标对象的称谓汉字表达，称谓间用‘的’字分隔
	target?: string; // 相对对象：相对对象的称谓汉字表达，称谓间用‘的’字分隔，空表示自己
	sex?: 0 | 1; // 本人性别：0表示女性,1表示男性
	type?: 'default' | 'chain' | 'pair'; // 转换类型：'default'计算称谓,'chain'计算关系链,'pair'计算关系合称
	reverse?: boolean; // 称呼方式：true对方称呼我,false我称呼对方
	mode?: string; // 模式选择：使用setMode方法定制不同地区模式，在此选择自定义模式
	optimal?: boolean; // 最短关系：计算两者之间的最短关系
}): string[] {
	return relationship(option);
}
