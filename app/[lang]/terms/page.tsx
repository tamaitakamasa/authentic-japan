import { ContentHeader } from "@/components/Layout/ContentHeader";
import { Locale } from "@/constants/site";
import { useTranslations } from "@/lib/i18n";
import { Metadata } from "next";

type Props = {
  params: { lang: Locale };
};

export async function generateMetadata({
  params: { lang },
}: Props): Promise<Metadata> {
  return {
    // タイトルだけをオーバーライド
    // layout.tsxで設定したテンプレートが適用される
    title: {
      ja: "利用規約",
      en: "TERMS OF USE",
      fr: "CONDITIONS D'UTILISATION",
    }[lang],
  };
}

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const t = useTranslations(lang);

  return (
    <>
      <ContentHeader
        title={t({
          ja: "利用規約",
          en: "TERMS OF USE",
          fr: "CONDITIONS D'UTILISATION",
        })}
        breadcrumbs={[
          {
            label: "HOME",
            href: "/",
          },
          {
            label: t({
              ja: "利用規約",
              en: "TERMS OF USE",
              fr: "CONDITIONS D'UTILISATION",
            }),
          },
        ]}
        lang={lang}
      />
      <div className="l-contents__body p-page p-page-privacy">
        <div className="p-page-privacy__content c-article">
          <section>
            <h2>
              {t({
                ja: "第1章 総則",
                en: "Chapter 1: General Provisions",
                fr: "Chapitre 1 : Dispositions générales",
              })}
            </h2>

            <section>
              <h3>
                {t({
                  ja: "第1条 (目的)",
                  en: "Article 1 (Purpose)",
                  fr: "Article 1 (Objet)",
                })}
              </h3>
              <p>
                {t({
                  ja: "本利用規約は、Authentic Japan（以下「当社」という）が提供するプラットフォームサービス（以下「本サービス」という）の利用に関する条件を定めるものです。本サービスは、日本各地の深層に流れる地域の精神性と内面性を伝える体験を、ナビゲーターと利用者を繋ぐことで実現します。",
                  en: 'These Terms of Service establish the conditions for using the platform service (hereinafter referred to as "the Service") provided by Authentic Japan (hereinafter referred to as "the Company"). The Service facilitates experiences that convey the spiritual and inner aspects of various regions in Japan by connecting Navigators with Users.',
                  fr: "Les présentes Conditions d'utilisation établissent les modalités d'utilisation de la plateforme de services (ci-après « le Service ») fournie par Authentic Japan (ci-après « la Société »). Le Service facilite les expériences qui transmettent les aspects spirituels et intérieurs des différentes régions du Japon en connectant les Navigateurs avec les Utilisateurs.",
                })}
              </p>
            </section>

            <section>
              <h3>
                {t({
                  ja: "第2条 (定義)",
                  en: "Article 2 (Definitions)",
                  fr: "Article 2 (Définitions)",
                })}
              </h3>
              <ol>
                <li>
                  {t({
                    ja: "「ナビゲーター」とは、本サービスに登録し、体験プログラムを提供する個人または団体をいいます。",
                    en: '"Navigator" refers to individuals or organizations registered with the Service who provide experience programs.',
                    fr: "« Navigateur » désigne les individus ou organisations inscrits au Service qui fournissent des programmes d'expérience.",
                  })}
                </li>
                <li>
                  {t({
                    ja: "「利用者」とは、本サービスを通じて体験プログラムを予約・参加する者をいいます。",
                    en: '"User" refers to individuals who book and participate in experience programs through the Service.',
                    fr: "« Utilisateur » désigne les personnes qui réservent et participent à des programmes d'expérience via le Service.",
                  })}
                </li>
                <li>
                  {t({
                    ja: "「体験プログラム」とは、ナビゲーターが提供する旅行、交流、学習に関する役務をいいます。",
                    en: '"Experience Program" refers to travel, exchange, and learning services provided by Navigators.',
                    fr: "« Programme d'expérience » désigne les services de voyage, d'échange et d'apprentissage fournis par les Navigateurs.",
                  })}
                </li>
              </ol>
            </section>

            <section>
              <h3>
                {t({
                  ja: "第3条 (サービスの内容)",
                  en: "Article 3 (Service Content)",
                  fr: "Article 3 (Contenu du service)",
                })}
              </h3>
              <ol>
                <li>
                  {t({
                    ja: "当社は、ナビゲーターと利用者を電子的に仲介するプラットフォームを提供します。",
                    en: "The Company provides a platform that electronically mediates between Navigators and Users.",
                    fr: "La Société fournit une plateforme qui fait office d'intermédiaire électronique entre les Navigateurs et les Utilisateurs.",
                  })}
                </li>
                <li>
                  {t({
                    ja: "体験プログラムの企画、実施、管理はすべてナビゲーター自身の責任において行われます。",
                    en: "The planning, implementation, and management of Experience Programs are carried out under the sole responsibility of the Navigator.",
                    fr: "La planification, la mise en œuvre et la gestion des Programmes d'expérience sont effectuées sous la seule responsabilité du Navigateur.",
                  })}
                </li>
              </ol>
            </section>
          </section>

          <section>
            <h2>
              {t({
                ja: "第2章 会員登録",
                en: "Chapter 2: Member Registration",
                fr: "Chapitre 2 : Inscription des membres",
              })}
            </h2>

            <section>
              <h3>
                {t({
                  ja: "第4条 (利用登録)",
                  en: "Article 4 (User Registration)",
                  fr: "Article 4 (Inscription des utilisateurs)",
                })}
              </h3>
              <ol>
                <li>
                  {t({
                    ja: "本サービスの利用希望者（ナビゲーター、利用者）は、当社所定の方法により登録申請を行い、当社の審査を経て登録されるものとします。",
                    en: "Prospective users (Navigators and Users) must apply for registration through the Company's prescribed method and will be registered after passing the Company's review.",
                    fr: "Les utilisateurs potentiels (Navigateurs et Utilisateurs) doivent faire une demande d'inscription selon la méthode prescrite par la Société et seront inscrits après avoir passé l'examen de la Société.",
                  })}
                </li>
                <li>
                  {t({
                    ja: "当社は、以下の各号のいずれかに該当する場合、登録を拒否することができます。",
                    en: "The Company may refuse registration in any of the following cases:",
                    fr: "La Société peut refuser l'inscription dans l'un des cas suivants :",
                  })}
                  <ol type="a">
                    <li>
                      {t({
                        ja: "虚偽の情報を提供した場合",
                        en: "When false information is provided",
                        fr: "Lorsque de fausses informations sont fournies",
                      })}
                    </li>
                    <li>
                      {t({
                        ja: "過去に本規約に違反した者である場合",
                        en: "When the applicant has previously violated these terms",
                        fr: "Lorsque le demandeur a déjà violé ces conditions",
                      })}
                    </li>
                    <li>
                      {t({
                        ja: "その他、当社が不適切と判断した場合",
                        en: "When the Company deems it inappropriate for other reasons",
                        fr: "Lorsque la Société le juge inapproprié pour d'autres raisons",
                      })}
                    </li>
                  </ol>
                </li>
                <li>
                  {t({
                    ja: "利用者は満18歳以上であることを要します。18歳未満の場合は法定代理人の同意を必要とします。",
                    en: "Users must be at least 18 years old. Those under 18 require consent from their legal guardian.",
                    fr: "Les utilisateurs doivent avoir au moins 18 ans. Les personnes de moins de 18 ans doivent obtenir le consentement de leur tuteur légal.",
                  })}
                </li>
              </ol>
            </section>
          </section>

          <section>
            <h2>
              {t({
                ja: "第3章 責任と免責",
                en: "Chapter 3: Responsibilities and Disclaimers",
                fr: "Chapitre 3 : Responsabilités et clauses de non-responsabilité",
              })}
            </h2>

            <section>
              <h3>
                {t({
                  ja: "第5条 (ナビゲーターの責任)",
                  en: "Article 5 (Navigator Responsibilities)",
                  fr: "Article 5 (Responsabilités du Navigateur)",
                })}
              </h3>
              <ol>
                <li>
                  {t({
                    ja: "ナビゲーターは、提供する体験プログラムについて以下の責任を負います。",
                    en: "Navigators are responsible for the following regarding their Experience Programs:",
                    fr: "Les Navigateurs sont responsables des éléments suivants concernant leurs Programmes d'expérience :",
                  })}
                  <ol type="a">
                    <li>
                      {t({
                        ja: "安全管理",
                        en: "Safety management",
                        fr: "Gestion de la sécurité",
                      })}
                    </li>
                    <li>
                      {t({
                        ja: "正確な情報提供",
                        en: "Accurate information provision",
                        fr: "Fourniture d'informations précises",
                      })}
                    </li>
                    <li>
                      {t({
                        ja: "利用者との契約履行",
                        en: "Contract fulfillment with users",
                        fr: "Exécution du contrat avec les utilisateurs",
                      })}
                    </li>
                    <li>
                      {t({
                        ja: "事故発生時の対応",
                        en: "Response to accidents",
                        fr: "Réponse aux accidents",
                      })}
                    </li>
                  </ol>
                </li>
                <li>
                  {t({
                    ja: "ナビゲーターは、旅行業法その他の関連法規を遵守するものとします。",
                    en: "Navigators must comply with travel industry laws and other relevant regulations.",
                    fr: "Les Navigateurs doivent se conformer aux lois sur l'industrie du voyage et autres réglementations pertinentes.",
                  })}
                </li>
              </ol>
            </section>

            <section>
              <h3>
                {t({
                  ja: "第6条 (当社の免責)",
                  en: "Article 6 (Company Disclaimers)",
                  fr: "Article 6 (Clauses de non-responsabilité de la Société)",
                })}
              </h3>
              <ol>
                <li>
                  {t({
                    ja: "当社は、体験プログラムの内容、実施、結果について一切の責任を負いません。",
                    en: "The Company assumes no responsibility for the content, implementation, or results of Experience Programs.",
                    fr: "La Société n'assume aucune responsabilité quant au contenu, à la mise en œuvre ou aux résultats des Programmes d'expérience.",
                  })}
                </li>
                <li>
                  {t({
                    ja: "体験プログラムに起因する損害について、当社は賠償する義務を負いません。",
                    en: "The Company is not liable for damages arising from Experience Programs.",
                    fr: "La Société n'est pas responsable des dommages résultant des Programmes d'expérience.",
                  })}
                </li>
                <li>
                  {t({
                    ja: "ナビゲーターと利用者間の紛争については、当社は一切関与しません。",
                    en: "The Company will not be involved in disputes between Navigators and Users.",
                    fr: "La Société ne sera pas impliquée dans les litiges entre les Navigateurs et les Utilisateurs.",
                  })}
                </li>
                <li>
                  {t({
                    ja: "本サービスは現状有姿で提供され、特定の目的への適合性を保証するものではありません。",
                    en: 'The Service is provided "as is" and does not guarantee fitness for any particular purpose.',
                    fr: 'Le Service est fourni "tel quel" et ne garantit pas l\'adéquation à un usage particulier.',
                  })}
                </li>
              </ol>
            </section>

            <section>
              <h3>
                {t({
                  ja: "第7条 (損害賠償)",
                  en: "Article 7 (Compensation for Damages)",
                  fr: "Article 7 (Indemnisation des dommages)",
                })}
              </h3>
              <ol>
                <li>
                  {t({
                    ja: "利用者またはナビゲーターが本サービスの利用に関して第三者に損害を与えた場合、自己の責任と費用において解決するものとします。",
                    en: "If Users or Navigators cause damage to third parties in relation to the use of the Service, they shall resolve the matter at their own responsibility and expense.",
                    fr: "Si les Utilisateurs ou les Navigateurs causent des dommages à des tiers en relation avec l'utilisation du Service, ils devront résoudre le problème à leurs propres frais et responsabilité.",
                  })}
                </li>
                <li>
                  {t({
                    ja: "当社の損害賠償責任は、法令で許容される限り3万円を上限とし、直接かつ現実に被った損害の範囲に限られます。ただし、当社の故意または重過失による場合はこの限りではありません。",
                    en: "The Company's liability for damages is limited to 30,000 yen to the extent permitted by law and is limited to direct and actual damages incurred. However, this limitation does not apply in cases of willful misconduct or gross negligence by the Company.",
                    fr: "La responsabilité de la Société en matière de dommages est limitée à 30 000 yens dans la mesure permise par la loi et se limite aux dommages directs et réels subis. Toutefois, cette limitation ne s'applique pas en cas de faute intentionnelle ou de négligence grave de la part de la Société.",
                  })}
                </li>
              </ol>
            </section>
          </section>

          <section>
            <h2>
              {t({
                ja: "第4章 個人情報保護",
                en: "Chapter 4: Personal Information Protection",
                fr: "Chapitre 4 : Protection des informations personnelles",
              })}
            </h2>

            <section>
              <h3>
                {t({
                  ja: "第8条 (個人情報の取り扱い)",
                  en: "Article 8 (Handling of Personal Information)",
                  fr: "Article 8 (Traitement des informations personnelles)",
                })}
              </h3>
              <ol>
                <li>
                  {t({
                    ja: "当社は、本サービスを通じて取得する個人情報を、別途定める「個人情報保護方針」に従い適切に管理します。",
                    en: 'The Company will appropriately manage personal information obtained through the Service in accordance with the separately established "Privacy Policy."',
                    fr: 'La Société gérera de manière appropriée les informations personnelles obtenues via le Service conformément à la "Politique de confidentialité" établie séparément.',
                  })}
                </li>
                <li>
                  {t({
                    ja: "当社は、以下の目的で個人情報を利用することがあります：",
                    en: "The Company may use personal information for the following purposes:",
                    fr: "La Société peut utiliser les informations personnelles aux fins suivantes :",
                  })}
                  <ol type="a">
                    <li>
                      {t({
                        ja: "サービス提供および運営",
                        en: "Service provision and operation",
                        fr: "Fourniture et exploitation du service",
                      })}
                    </li>
                    <li>
                      {t({
                        ja: "ナビゲーターと利用者のマッチング",
                        en: "Matching Navigators and Users",
                        fr: "Mise en relation des Navigateurs et des Utilisateurs",
                      })}
                    </li>
                    <li>
                      {t({
                        ja: "サービス改善のための分析",
                        en: "Analysis for service improvement",
                        fr: "Analyse pour l'amélioration du service",
                      })}
                    </li>
                    <li>
                      {t({
                        ja: "お客様への連絡および情報提供",
                        en: "Communication and information provision to customers",
                        fr: "Communication et fourniture d'informations aux clients",
                      })}
                    </li>
                  </ol>
                </li>
              </ol>
            </section>
          </section>

          <section>
            <h2>
              {t({
                ja: "第5章 その他",
                en: "Chapter 5: Other Provisions",
                fr: "Chapitre 5 : Autres dispositions",
              })}
            </h2>

            <section>
              <h3>
                {t({
                  ja: "第9条 (規約の変更)",
                  en: "Article 9 (Changes to Terms)",
                  fr: "Article 9 (Modifications des conditions)",
                })}
              </h3>
              <ol>
                <li>
                  {t({
                    ja: "当社は、必要に応じて本規約を変更できるものとします。",
                    en: "The Company may modify these terms as necessary.",
                    fr: "La Société peut modifier ces conditions si nécessaire.",
                  })}
                </li>
                <li>
                  {t({
                    ja: "規約変更時は、当社所定の方法により通知するものとします。",
                    en: "When terms are modified, notification will be made through the Company's prescribed method.",
                    fr: "Lorsque les conditions sont modifiées, une notification sera faite selon la méthode prescrite par la Société.",
                  })}
                </li>
              </ol>
            </section>

            <section>
              <h3>
                {t({
                  ja: "第10条 (準拠法・管轄)",
                  en: "Article 10 (Governing Law and Jurisdiction)",
                  fr: "Article 10 (Loi applicable et juridiction)",
                })}
              </h3>
              <p>
                {t({
                  ja: "本規約は日本法に準拠し、本サービスに関する紛争は、当社の所在地を管轄する裁判所を第一審の専属的合意管轄裁判所とします。",
                  en: "These terms are governed by Japanese law, and any disputes related to the Service shall be subject to the exclusive jurisdiction of the court having jurisdiction over the location of the Company's headquarters as the court of first instance.",
                  fr: "Ces conditions sont régies par le droit japonais, et tout litige lié au Service sera soumis à la compétence exclusive du tribunal ayant juridiction sur le lieu du siège social de la Société en première instance.",
                })}
              </p>
            </section>
          </section>

          <section>
            <p className="p-page-privacy__appendix">
              {t({
                ja: "附則 この利用規約は、2024年12月26日から施行します。",
                en: "Supplementary Provision: These Terms of Service shall come into effect from December 26, 2024.",
                fr: "Disposition supplémentaire : Les présentes conditions d'utilisation entreront en vigueur le 26 décembre 2024.",
              })}
            </p>
          </section>

          <section className="p-page-privacy__law">
            <h2>
              {t({
                ja: "特定商取引法に基づく表記",
                en: "Notation Based on the Act on Specified Commercial Transactions",
                fr: "Mentions légales basées sur la loi sur les transactions commerciales spécifiées",
              })}
            </h2>
            <dl>
              <div>
                <dt>
                  {t({
                    ja: "事業者名",
                    en: "Business Name",
                    fr: "Nom de l'entreprise",
                  })}
                </dt>
                <dd>
                  {t({
                    ja: "株式会社次世代共創企画",
                    en: "Next Generation Co-Creation Planning Corporation",
                    fr: "Next Generation Co-Creation Planning Corporation",
                  })}
                </dd>
              </div>
              <div>
                <dt>
                  {t({
                    ja: "代表者名",
                    en: "Representative",
                    fr: "Représentant",
                  })}
                </dt>
                <dd>
                  {t({
                    ja: "山中昌幸",
                    en: "Masayuki Yamanaka",
                    fr: "Masayuki Yamanaka",
                  })}
                </dd>
              </div>
              <div>
                <dt>
                  {t({
                    ja: "所在地",
                    en: "Address",
                    fr: "Adresse",
                  })}
                </dt>
                <dd>
                  {t({
                    ja: "兵庫県淡路市志筑1721-1",
                    en: "1721-1 Shitsuki, Awaji City, Hyogo Prefecture",
                    fr: "1721-1 Shitsuki, Ville d'Awaji, Préfecture de Hyogo",
                  })}
                </dd>
              </div>
              <div>
                <dt>
                  {t({
                    ja: "電話番号",
                    en: "Phone Number",
                    fr: "Numéro de téléphone",
                  })}
                </dt>
                <dd>0799-64-7766</dd>
              </div>
              <div>
                <dt>
                  {t({
                    ja: "メールアドレス",
                    en: "Email Address",
                    fr: "Adresse e-mail",
                  })}
                </dt>
                <dd>aj-info@awajilab.jp</dd>
              </div>
              <div>
                <dt>
                  {t({
                    ja: "販売価格",
                    en: "Sales Price",
                    fr: "Prix de vente",
                  })}
                </dt>
                <dd>
                  {t({
                    ja: "各商品ページに記載",
                    en: "Listed on each product page",
                    fr: "Indiqué sur chaque page de produit",
                  })}
                </dd>
              </div>
              <div>
                <dt>
                  {t({
                    ja: "商品代金以外の必要料金",
                    en: "Additional Fees",
                    fr: "Frais supplémentaires",
                  })}
                </dt>
                <dd>
                  {t({
                    ja: "各商品ページに記載",
                    en: "Listed on each product page",
                    fr: "Indiqué sur chaque page de produit",
                  })}
                </dd>
              </div>
              <div>
                <dt>
                  {t({
                    ja: "代金支払時期",
                    en: "Payment Timing",
                    fr: "Moment du paiement",
                  })}
                </dt>
                <dd>
                  {t({
                    ja: "各商品ページに記載 / 表示価格は消費税込",
                    en: "Listed on each product page / Prices include consumption tax",
                    fr: "Indiqué sur chaque page de produit / Prix TTC",
                  })}
                </dd>
              </div>
              <div>
                <dt>
                  {t({
                    ja: "サービス提供時期",
                    en: "Service Provision Timing",
                    fr: "Moment de la fourniture du service",
                  })}
                </dt>
                <dd>
                  {t({
                    ja: "予約の利用日に提供",
                    en: "Provided on the reserved date",
                    fr: "Fourni à la date réservée",
                  })}
                </dd>
              </div>
              <div>
                <dt>
                  {t({
                    ja: "契約申込の撤回または解除に関する事項",
                    en: "Cancellation and Withdrawal Policy",
                    fr: "Politique d'annulation et de rétractation",
                  })}
                </dt>
                <dd>
                  {t({
                    ja: "各商品ページに記載",
                    en: "Listed on each product page",
                    fr: "Indiqué sur chaque page de produit",
                  })}
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </>
  );
}
