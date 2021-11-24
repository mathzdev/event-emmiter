# Coding Challenge: EventEmitter

## O problema

Crie uma lib `EventEmitter` usando javascript.

Com ela é possível escutar e emitir eventos.

## API esperada:
- `listen`: Deve adicionar um listner para o eventName;
- `emit`: Deve emitir eventos, trigando seus listeners;
- `removeEvent`: Deve remover os listners desse eventName;
- Eventos podem ser emitidos com dados, que serão repassados para os listeners;
- `listenOnce`: Semelhante ao `listen`, entretanto o callback será trigado apenas uma vez;
- `removeAllEvents`: Deve remover todos os eventos e listeners

## Exemplo:

```js
EventEmmiter.listen('my-awesome-event', doSomething)
EventEmmiter.listen('my-awesome-event', doSomethingElse)

EventEmmiter.emit('my-awesome-event')
EventEmmiter.emit('my-awesome-event', { foo: "bar" })

EventEmmiter.removeEvent('my-awesome-event')
```

## Expectativa de solução

Não há resposta correta. Problemas podem ser resolvidos de diferentes formas. Fique a vontade para trazer sua solução. =)

## Arquivo de tests
Junto ao desafio, há um arquivo de testes para verificar o funcionamento do código.

## Rodando os testes

```js
// yarn
yarn
yarn test

// npm
npm i
npm test
```
