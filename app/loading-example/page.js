import Link from "next/link"

export default function LoadingExample() {
  return (
    <div className="font-sans min-h-screen p-8">
      <h1 className="text-3xl mb-8">Loading Examples</h1>
      
      <div className="space-y-4">
        <div>
          <Link href="/loading-example/server" className="text-blue-500 hover:underline block">
            1. Серверная загрузка
          </Link>
          <p className="text-gray-600 ml-4">Данные загружаются на сервере до отправки HTML</p>
        </div>

        <div>
          <Link href="/loading-example/client" className="text-blue-500 hover:underline block">
            2. Клиентская загрузка
          </Link>
          <p className="text-gray-600 ml-4">Данные загружаются в браузере после рендеринга страницы</p>
        </div>
      </div>

      <div className="mt-8 text-sm text-gray-500">
        <p>Оба примера имеют искусственную задержку в 2 секунды для демонстрации разницы в подходах.</p>
      </div>
    </div>
  )
}