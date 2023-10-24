import { SEO } from "../../components/seo";

export default function QuemSomos() {
  return (
    <div className="container px-4">
      <SEO
        title={"Quem Somos"}
        siteTitle={import.meta.env.VITE_TITLE}
        description={import.meta.env.VITE_DESCRIPTION}
        keywords={import.meta.env.VITE_KEYWORDS}
        image={import.meta.env.VITE_IMAGE}
        robots
      />
      <div className="prose mx-auto md:prose-2xl">
        <h3>Quem Somos - {import.meta.env.VITE_NAME} em Itápolis</h3>
        <p>
          Bem-vindo à {import.meta.env.VITE_NAME} em Itápolis! Somos uma equipe
          apaixonada e dedicada, pronta para ajudá-lo a encontrar a casa dos
          seus sonhos. Nossa imobiliária é reconhecida por oferecer serviços de
          qualidade, opções de financiamento diversificadas e atendimento
          personalizado para atender às suas necessidades imobiliárias. Aqui,
          transformamos sonhos em realidade.
        </p>
        <h3>Nossa Missão</h3>
        <p>
          Nossa missão é facilitar a jornada de compra, venda e aluguel de
          imóveis em Itápolis, oferecendo serviços confiáveis, transparentes e
          orientados para o cliente. Acreditamos que cada cliente é único, e
          nossa equipe está empenhada em entender suas preferências e objetivos
          para encontrar as melhores soluções imobiliárias.
        </p>
        <h3>Por Que Escolher a {import.meta.env.VITE_NAME}?</h3>
        <ul>
          <li>
            1. <strong>Experiência Local:</strong> Com um profundo conhecimento
            do mercado imobiliário de Itápolis, estamos em posição privilegiada
            para oferecer orientação precisa e recomendações bem informadas.
          </li>
          {/* <li>
            2. <strong>Financiamento Facilitado:</strong> Somos credenciados
            pela Caixa Econômica Federal para oferecer financiamentos de
            imóveis, tornando o processo de compra mais acessível e conveniente
            para você.
          </li> */}
          {/* <li>
            3. <strong>Variedade de Opções:</strong> Nossa carteira de imóveis
            inclui uma ampla variedade de opções, desde casas charmosas a
            apartamentos modernos. Temos algo para todos os gostos e
            necessidades.
          </li> */}
          <li>
            2. <strong>Atendimento Personalizado:</strong> Entendemos que
            comprar ou vender um imóvel é uma decisão importante. Nossa equipe
            calorosa e profissional está pronta para ouvir você, responder a
            todas as suas perguntas e fornecer assistência personal
          </li>
          izada.
          <li>
            3. <strong>Processo Descomplicado:</strong> Simplificamos todo o
            processo de transação imobiliária, desde a pesquisa até o fechamento
            do negócio. Cuidamos de todos os detalhes para que você possa se
            concentrar no que é realmente importante.
          </li>
          {/* <li>
            6. <strong>Aceitamos Cartão de Crédito:</strong> Além das opções de
            financiamento tradicionais, oferecemos a conveniência de pagamento
            por cartão de crédito, tornando o processo ainda mais flexível.
          </li> */}
        </ul>
        <h3>Nossa Equipe</h3>
        <p>
          Nossa equipe é composta por profissionais experientes e comprometidos,
          apaixonados pelo mercado imobiliário e pela cidade de Itápolis.
          Estamos aqui para ajudar você a encontrar o lar perfeito ou a melhor
          oportunidade de investimento.
        </p>
        <p>
          Estamos ansiosos para conhecê-lo e auxiliá-lo em sua jornada
          imobiliária. Entre em contato conosco hoje mesmo para agendar uma
          visita, tirar suas dúvidas ou iniciar o processo de compra, venda ou
          aluguel. A {import.meta.env.VITE_NAME} está aqui para realizar seus
          sonhos imobiliários em Itápolis!
        </p>
        <h3>Informações de Contato</h3>
        <address>
          {import.meta.env.VITE_NAME} - Endereço: {import.meta.env.VITE_ADDRESS}{" "}
          - Telefone: {import.meta.env.VITE_TEL} - Horário de Funcionamento:
          8:00 as 18:00 - Website: www.kmenegociosimobiliarios.com.br
        </address>
        <strong>
          <i>
            Transformando Casas em Lares {/*desde {new Date().getFullYear()}*/}
          </i>
        </strong>
      </div>
    </div>
  );
}
