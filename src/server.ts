import app from './app.ts'
import { env } from './config/env.ts/index.ts'



const PORT = env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
})
