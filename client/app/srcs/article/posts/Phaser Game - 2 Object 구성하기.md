# Phaser Game - 2 Loader 구성하기

Phaser에서 사용할 리소스는 Scene 구성에서 preload 과정에서 메모리에 불러온다.

이러한 리소스는 이미지, 스프라이트, 사운드 등등이 있다.

### 이미지, sprite 로드하기

Nextjs를 통해 구성하면서 정적(static) 파일을 public 폴더에 저장하므로 사용할 이미지 파일을 public에 저장한다.

저장 후 해당 파일을 아래 코드로 메모리에 올릴 수 있다. 메모리에 올라간 이미지는 불러올 때 설정할 key값으로 어디서든 사용 할 수 있다.

```javascript
class Stage extends Scene {
  preload() {
    this.load.image('호출에 사용할 key 값', '이미지 경로');
  }

  /** 아래처럼 사용 가능 */
  create() {
    this.add.image(0, 0, '호출에 사용할 key 값')
  }
}
```

게임을 구성할 때 이미지를 하나씩 로드할 수 도 있지만 스프라이트 아틀라스(sprite atlas)를 사용하여 여러 이미지를 하나의 파일로 묶은 이미지를 나눠서 처리할 수 있다.

atlas는 아래처럼 여러 이미지를 하나의 파일에 그려두고 그 정보를 담은 json파일을 가지고 있다. phaser의 로더는 json파일의 정보를 통해 해당 이미지를 잘라서 저장해두고 있다.

![img](https://raw.githubusercontent.com/Komponent1/Hobby/refs/heads/master/client/app/public/assets/survival-knight/ui/ui.png)

저장된 이미지는 load시 사용한 key값과 json파일에 등록된 파일이름을 통해 사용할 수 있다.
아래 코드를 참고하자

```javascript
preload() {
  this.load.atlas('호출에 사용할 key', '이미지 파일 경로', 'json 파일 경로');
}

create() {
  this.add.image(0, 0, '호출에 사용할 key', 'json에 filename으로 등록된 key값');
}
```

아예 atlas가 아닌 일반 스프라이트를 로드할 수 있다. (보통 무료 에셋사이트의 캐릭터 스프라이트는 json을 제공하지 않는다)

sprite을 직접 로드하려면 스프라이트의 규격이 동일한 간격으로 구성되게 이미지를 구성해야한다.

```javascript
preload() {
  this.load.sriteSheet('호출에 사용할 key', '이미지 파일 경로', {
    frameWidth: `자를 너비(number)`,
    frameHeight: `자를 높이(number)`,
  });
}

create() {
  this.add.sprite(0, 0, '호출에 사용할 키');
}
```

### 그 외

게임에 사용되는 다른 리소스들 또한 loader를 통해 로드/사용할 수 있다.

주로 사용하는 요소는 소리나 타일맵 등을 예시로 들 수 있다.

자세한 부분은 [공식문서](https://docs.phaser.io/phaser/concepts/loader)를 참고하자
